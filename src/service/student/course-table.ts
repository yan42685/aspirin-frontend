import { CourseDetailDTO } from "@/api/rest-api";
import Timetables from "timetables";

const timetableType = [
  [{ index: "1", name: "8:00-8:45" }, 1],
  [{ index: "2", name: "8:55-9:40" }, 1],
  [{ index: "3", name: "9:55-10:40" }, 1],
  [{ index: "4", name: "10:50-11:35" }, 1],
  [{ index: "5", name: "14:00-14:45" }, 1],
  [{ index: "6", name: "14:55-15:40" }, 1],
  [{ index: "7", name: "15:55-16:40" }, 1],
  [{ index: "8", name: "16:55-17:40" }, 1],
  [{ index: "9", name: "19:00-19:45" }, 1],
  [{ index: "10", name: "19:55-20:40" }, 1],
  [{ index: "11", name: "20:55-21:40" }, 1],
  [{ index: "12", name: "21:55-22:40" }, 1]
];

const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const courseList = [] as string[][];
// courseList[0][3] = "高等数学@张阳\n教四305333333333333";
// courseList[0][2] = "高等数学@张阳\n教四305333333333333";

const styles = {
  // 格子高度
  Gheight: 47,
  leftHandWidth: 100,
  palette: ["#ff6633"]
};

function getCourseDescription(course: CourseDetailDTO): string {
  return (
    course.courseName + "@" + course.teacherName + "\n" + course.classroomName
  );
}

function populateCourseList(list: CourseDetailDTO[]) {
  // 清空courseList
  for (let i = 0; i < 7; i++) {
    const oneDayCourses = [];
    for (let j = 0; j < 12; j++) {
      oneDayCourses.push("");
    }
    courseList.push(oneDayCourses);
  }

  // 填充数据
  list
    .filter(course => {
      const schedulingTime = course.schedulingTime;
      const dayOfTheWeek = course.dayOfTheWeek;
      const isTimeValid =
        schedulingTime >= 1 ||
        schedulingTime <= 11 ||
        dayOfTheWeek >= 1 ||
        dayOfTheWeek <= 7;

      if (!isTimeValid) {
        console.log("过滤了一个时间不合规的课程", course);
      }
      return isTimeValid;
    })
    .forEach(course => {
      const week = course.dayOfTheWeek - 1;
      const time = course.schedulingTime - 1;
      courseList[week][time] = getCourseDescription(course);
      courseList[week][time + 1] = getCourseDescription(course);
    });
}

let timeTable: any = null;

// 一个组件只能在能够获取到真实dom节点的生命周期中进行render一次, 因为是动态添加的带id的dom节点
export function renderCourseTable(list: CourseDetailDTO[]) {
  populateCourseList(list);

  timeTable = new Timetables({
    el: "#courseTable",
    timetables: courseList,
    week: week,
    timetableType: timetableType,
    gridOnClick: function(e: any) {
      // console.log(e);
    },
    styles: styles
  });
}

export function updateCourseTable(list: CourseDetailDTO[]) {
  populateCourseList(list);

  timeTable.setOption({
    timetables: courseList,
    week: week,
    timetableType: timetableType,
    gridOnClick: function(e: any) {
      // console.log(e);
    },
    styles: styles
  });
}
