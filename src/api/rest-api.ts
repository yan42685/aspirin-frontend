/* tslint:disable */
/* eslint-disable */

export interface AdministratorDTO {
  username: string;
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
  avatarUrl: string;
  number: string;
}

export interface AdministratorModifiableDTO {
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
  avatarUrl: string;
  number: string;
}

export interface ApplicationSwitchDTO {
  switchEnum: ApplicationSwitchEnum;
  status: boolean;
}

export interface BulletinDTO extends Serializable {
  id: number;
  createTime: Date;
  updateTime: Date;
  title: string;
  content: string;
  administratorNickname: string;
}

export interface ClassroomDTO {
  location: string;
  number: string;
}

export interface CourseAssignDTO {
  teacherNumber: string;
  courseNumber: string;
  schedulingTime: number;
  dayOfTheWeek: number;
  classroomNumber: string;
  semester: number;
}

export interface CourseDTO extends Serializable {
  iconUrl: string;
  name: string;
  number: string;
  type: CourseTypeEnum;
  description: string;
  period: number;
  credit: number;
}

export interface CourseDetailDTO {
  id: number;
  teacherNumber: string;
  teacherName: string;
  courseNumber: string;
  courseName: string;
  classroomNumber: string;
  classroomName: string;
  schedulingTime: number;
  dayOfTheWeek: number;
  type: CourseTypeEnum;
  iconUrl: string;
  description: string;
  period: number;
  credit: number;
  semester: number;
}

export interface CourseDropDTO {
  createTime: Date;
  courseDetailId: number;
  teacherName: string;
  courseName: string;
  classroomName: string;
  type: CourseTypeEnum;
  iconUrl: string;
  description: string;
  period: number;
  credit: number;
  semester: number;
}

export interface CourseModifiableDTO {
  name: string;
  number: string;
  type: CourseTypeEnum;
  description: string;
  period: number;
  credit: number;
}

export interface FacultyDTO {
  name: string;
  phoneNumber: string;
  avatarUrl: string;
  number: string;
}

export interface GradeDTO {
  teacherName: string;
  courseNumber: string;
  courseName: string;
  type: CourseTypeEnum;
  period: number;
  credit: number;
  semester: number;
  regularScores: number;
  examScores: number;
  finalScores: number;
}

export interface LoginTokenDTO {
  role: RoleEnum;
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface MarkInputDTO {
  gradeId: number;
  regularScores: number;
  examScores: number;
}

export interface MarkOutputDTO {
  gradeId: number;
  submitted: boolean;
  specialtyName: string;
  studentNumber: string;
  studentName: string;
  courseDetailId: number;
  courseNumber: string;
  courseName: string;
  type: CourseTypeEnum;
  period: number;
  credit: number;
  semester: number;
  regularScores: number;
  examScores: number;
  finalScores: number;
}

export interface SpecialtyDTO {
  name: string;
  facultyNumber: string;
  number: string;
}

export interface StudentDTO {
  username: string;
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
  avatarUrl: string;
  faculty: string;
  specialty: string;
  number: string;
  admissionYear: number;
  semester: number;
}

export interface StudentManagementDTO {
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  faculty: string;
  specialty: string;
  number: string;
  admissionYear: number;
  semester: number;
}

export interface StudentModifiableDTO {
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
}

export interface StudentQueryDTO {
  facultyNumber: string;
  specialtyNumber: string;
  admissionYear: number;
  numberOrRealName: string;
}

export interface TeacherDTO {
  username: string;
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
  avatarUrl: string;
  number: string;
  faculty: string;
}

export interface TeacherManagementDTO {
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  number: string;
  facultyNumber: string;
}

export interface TeacherModifiableDTO {
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
}

export interface UserDTO {
  username: string;
  realName: string;
  gender: GenderEnum;
  phoneNumber: string;
  contactInformation: string;
  nickname: string;
  avatarUrl: string;
}

export interface Serializable {}

export interface JsonWrapper<T> {
  code: number;
  message: string;
  data: T;
}

export interface IPage<T> extends Serializable {
  size: number;
  total: number;
  current: number;
  searchCount: boolean;
  pages: number;
  records: T[];
}

export interface RestApplication {
  /**
   * HTTP GET /api/account/admin-login
   * Java method: com.hubu.aspirin.controller.AccountController.adminLogin
   */
  adminLogin(): RestResponse<JsonWrapper<UserDTO>>;

  /**
   * HTTP GET /api/account/get-verification-code
   * Java method: com.hubu.aspirin.controller.AccountController.getVerificationCode
   */
  getVerificationCode(): RestResponse<void>;

  /**
   * HTTP GET /api/account/logout
   * Java method: com.hubu.aspirin.controller.AccountController.logout
   */
  logout(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP GET /api/account/user-login
   * Java method: com.hubu.aspirin.controller.AccountController.userLogin
   */
  userLogin(): RestResponse<JsonWrapper<UserDTO>>;

  /**
   * HTTP PUT /api/administrator/app-switch
   * Java method: com.hubu.aspirin.controller.AdministratorController.flipApplicationVariable
   */
  flipApplicationVariable(): RestResponse<JsonWrapper<ApplicationSwitchDTO>>;

  /**
   * HTTP GET /api/administrator/app-switch
   * Java method: com.hubu.aspirin.controller.AdministratorController.getApplicationSwitchStatus
   */
  getApplicationSwitchStatus(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP DELETE /api/administrator/bulletin
   * Java method: com.hubu.aspirin.controller.AdministratorController.deleteBulletin
   */
  deleteBulletin(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP POST /api/administrator/bulletin
   * Java method: com.hubu.aspirin.controller.AdministratorController.sendBulletin
   */
  sendBulletin(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP PUT /api/administrator/bulletin
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateBulletin
   */
  updateBulletin(): RestResponse<JsonWrapper<BulletinDTO>>;

  /**
   * HTTP GET /api/administrator/info-by-number
   * Java method: com.hubu.aspirin.controller.AdministratorController.getAdministratorDtoByNumber
   */
  getAdministratorDtoByNumber(): RestResponse<JsonWrapper<AdministratorDTO>>;

  /**
   * HTTP GET /api/administrator/information
   * Java method: com.hubu.aspirin.controller.AdministratorController.getAccountInfo
   */
  getAccountInfo(): RestResponse<JsonWrapper<AdministratorDTO>>;

  /**
   * HTTP PUT /api/administrator/information
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateAdministratorInformation
   */
  updateAdministratorInformation(): RestResponse<JsonWrapper<AdministratorDTO>>;

  /**
   * HTTP POST /api/administrator/information/student
   * Java method: com.hubu.aspirin.controller.AdministratorController.addStudent
   */
  addStudent(): RestResponse<JsonWrapper<StudentDTO>>;

  /**
   * HTTP PUT /api/administrator/information/student
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateStudent
   */
  updateStudent$PUT$api_administrator_information_student(): RestResponse<
    JsonWrapper<StudentDTO>
  >;

  /**
   * HTTP DELETE /api/administrator/information/student
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateStudent
   */
  updateStudent$DELETE$api_administrator_information_student(): RestResponse<
    JsonWrapper<boolean>
  >;

  /**
   * HTTP GET /api/administrator/information/student-page
   * Java method: com.hubu.aspirin.controller.AdministratorController.getStudentPage
   */
  getStudentPage(): RestResponse<JsonWrapper<IPage<StudentDTO>>>;

  /**
   * HTTP POST /api/administrator/information/teacher
   * Java method: com.hubu.aspirin.controller.AdministratorController.addTeacher
   */
  addTeacher(): RestResponse<JsonWrapper<TeacherDTO>>;

  /**
   * HTTP PUT /api/administrator/information/teacher
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateTeacher
   */
  updateTeacher$PUT$api_administrator_information_teacher(): RestResponse<
    JsonWrapper<TeacherDTO>
  >;

  /**
   * HTTP DELETE /api/administrator/information/teacher
   * Java method: com.hubu.aspirin.controller.AdministratorController.updateTeacher
   */
  updateTeacher$DELETE$api_administrator_information_teacher(): RestResponse<
    JsonWrapper<boolean>
  >;

  /**
   * HTTP GET /api/administrator/information/teacher-page
   * Java method: com.hubu.aspirin.controller.AdministratorController.getTeacherPage
   */
  getTeacherPage(): RestResponse<JsonWrapper<IPage<TeacherDTO>>>;

  /**
   * HTTP GET /api/basic-info/classroom/list
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getClassroomList
   */
  getClassroomList(): RestResponse<JsonWrapper<ClassroomDTO[]>>;

  /**
   * HTTP GET /api/basic-info/course-type/list
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getAllCourseType
   */
  getAllCourseType(): RestResponse<JsonWrapper<CourseTypeEnum[]>>;

  /**
   * HTTP GET /api/basic-info/faculty-names
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getAllFaculty
   */
  getAllFaculty(): RestResponse<JsonWrapper<FacultyDTO[]>>;

  /**
   * HTTP GET /api/basic-info/faculty/specialty-names
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getAllSpecialtyByFacultyNumber
   */
  getAllSpecialtyByFacultyNumber(): RestResponse<JsonWrapper<SpecialtyDTO[]>>;

  /**
   * HTTP GET /api/basic-info/specialty-names
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getAllSpecialty
   */
  getAllSpecialty(): RestResponse<JsonWrapper<SpecialtyDTO[]>>;

  /**
   * HTTP GET /api/basic-info/specialty/admission-years
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getAllAdmissionYearBySpecialtyNumber
   */
  getAllAdmissionYearBySpecialtyNumber(): RestResponse<JsonWrapper<number[]>>;

  /**
   * HTTP GET /api/basic-info/student
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getStudentByNumber
   */
  getStudentByNumber(): RestResponse<JsonWrapper<StudentDTO>>;

  /**
   * HTTP GET /api/basic-info/teacher
   * Java method: com.hubu.aspirin.controller.BasicInformationController.getTeacherByNumber
   */
  getTeacherByNumber(): RestResponse<JsonWrapper<TeacherDTO>>;

  /**
   * HTTP GET /api/basic-info/user/is-existed
   * Java method: com.hubu.aspirin.controller.BasicInformationController.isUserExisted
   */
  isUserExisted(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP POST /api/course
   * Java method: com.hubu.aspirin.controller.CourseController.createOne
   */
  createOne(): RestResponse<JsonWrapper<CourseDTO>>;

  /**
   * HTTP DELETE /api/course
   * Java method: com.hubu.aspirin.controller.CourseController.deleteByNumber
   */
  deleteByNumber(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP PUT /api/course
   * Java method: com.hubu.aspirin.controller.CourseController.updateByNumber
   */
  updateByNumber(): RestResponse<JsonWrapper<CourseDTO>>;

  /**
   * HTTP PUT /api/course/assign
   * Java method: com.hubu.aspirin.controller.CourseController.assignCourseForTeacher
   */
  assignCourseForTeacher(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP GET /api/course/before-assign
   * Java method: com.hubu.aspirin.controller.CourseController.checkBeforeAssign
   */
  checkBeforeAssign(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP GET /api/course/classroom/schedule
   * Java method: com.hubu.aspirin.controller.CourseController.classroomCourseSchedule
   */
  classroomCourseSchedule(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP PUT /api/course/icon
   * Java method: com.hubu.aspirin.controller.CourseController.modifyIconByNumber
   */
  modifyIconByNumber(): RestResponse<JsonWrapper<string>>;

  /**
   * HTTP GET /api/course/page
   * Java method: com.hubu.aspirin.controller.CourseController.queryCoursePage
   */
  queryCoursePage(): RestResponse<JsonWrapper<IPage<CourseDTO>>>;

  /**
   * HTTP GET /api/course/teacher/schedule
   * Java method: com.hubu.aspirin.controller.CourseController.teacherCourseSchedule
   */
  teacherCourseSchedule(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP GET /api/student/available-course-list
   * Java method: com.hubu.aspirin.controller.StudentController.availableCourseDetailList
   */
  availableCourseDetailList(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP GET /api/student/course-drop-record
   * Java method: com.hubu.aspirin.controller.StudentController.pageCourseDropRecord
   */
  pageCourseDropRecord(): RestResponse<JsonWrapper<IPage<CourseDropDTO>>>;

  /**
   * HTTP GET /api/student/course-schedule
   * Java method: com.hubu.aspirin.controller.StudentController.getCourseSchedule
   */
  getCourseSchedule(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP DELETE /api/student/elective
   * Java method: com.hubu.aspirin.controller.StudentController.dropCourse
   */
  dropCourse(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP POST /api/student/elective
   * Java method: com.hubu.aspirin.controller.StudentController.electCourse
   */
  electCourse(): RestResponse<JsonWrapper<CourseDetailDTO[]>>;

  /**
   * HTTP GET /api/student/grade
   * Java method: com.hubu.aspirin.controller.StudentController.pageGrade
   */
  pageGrade(): RestResponse<JsonWrapper<IPage<GradeDTO>>>;

  /**
   * HTTP GET /api/student/information
   * Java method: com.hubu.aspirin.controller.StudentController.getInformation
   */
  getInformation$GET$api_student_information(): RestResponse<
    JsonWrapper<StudentDTO>
  >;

  /**
   * HTTP PUT /api/student/information
   * Java method: com.hubu.aspirin.controller.StudentController.updateInformation
   */
  updateInformation$PUT$api_student_information(): RestResponse<
    JsonWrapper<StudentDTO>
  >;

  /**
   * HTTP PUT /api/teacher/Information
   * Java method: com.hubu.aspirin.controller.TeacherController.updateInformation
   */
  updateInformation$PUT$api_teacher_Information(): RestResponse<
    JsonWrapper<TeacherDTO>
  >;

  /**
   * HTTP GET /api/teacher/information
   * Java method: com.hubu.aspirin.controller.TeacherController.getInformation
   */
  getInformation$GET$api_teacher_information(): RestResponse<
    JsonWrapper<TeacherDTO>
  >;

  /**
   * HTTP POST /api/teacher/mark
   * Java method: com.hubu.aspirin.controller.TeacherController.markCourseList
   */
  markCourseList(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP PUT /api/teacher/mark
   * Java method: com.hubu.aspirin.controller.TeacherController.updateMarkCourseList
   */
  updateMarkCourseList(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP GET /api/teacher/mark-page
   * Java method: com.hubu.aspirin.controller.TeacherController.getMarkStudentPage
   */
  getMarkStudentPage(): RestResponse<JsonWrapper<IPage<MarkOutputDTO>>>;

  /**
   * HTTP PUT /api/teacher/submit-mark
   * Java method: com.hubu.aspirin.controller.TeacherController.submitMarkList
   */
  submitMarkList(): RestResponse<JsonWrapper<boolean>>;

  /**
   * HTTP GET /api/test/add
   * Java method: com.hubu.aspirin.controller.TestController.add
   */
  add(): RestResponse<JsonWrapper<number>>;

  /**
   * HTTP GET /api/test/password
   * Java method: com.hubu.aspirin.controller.TestController.reverse
   */
  reverse$GET$api_test_password(): RestResponse<JsonWrapper<string>>;

  /**
   * HTTP GET /api/test/reverse
   * Java method: com.hubu.aspirin.controller.TestController.reverse
   */
  reverse$GET$api_test_reverse(): RestResponse<JsonWrapper<string>>;

  /**
   * HTTP PUT /api/user/avatar
   * Java method: com.hubu.aspirin.controller.UserController.updateAvatar
   */
  updateAvatar(): RestResponse<JsonWrapper<string>>;

  /**
   * HTTP GET /api/user/bulletin-page-query
   * Java method: com.hubu.aspirin.controller.UserController.queryBulletinDto
   */
  queryBulletinDto(): RestResponse<JsonWrapper<IPage<BulletinDTO>>>;

  /**
   * HTTP PUT /api/user/password
   * Java method: com.hubu.aspirin.controller.UserController.modifyPassword
   */
  modifyPassword(): RestResponse<JsonWrapper<boolean>>;
}

export type RestResponse<R> = Promise<R>;

export const enum ApplicationSwitchEnum {
  ELECT_SWITCH = "ELECT_SWITCH",
  MARK_SWITCH = "MARK_SWITCH"
}

export const enum CourseTypeEnum {
  COMMON_COMPULSORY = "COMMON_COMPULSORY",
  PROFESSIONAL_COMPULSORY = "PROFESSIONAL_COMPULSORY",
  COMMON_ELECTIVE = "COMMON_ELECTIVE",
  PROFESSIONAL_ELECTIVE = "PROFESSIONAL_ELECTIVE"
}

export const enum ElectiveStatusEnum {
  CHOSEN = "CHOSEN",
  DROPPED = "DROPPED"
}

export const enum ExceptionEnum {
  FILE_IO_EXCEPTION = 51,
  TO_BE_IMPLEMENTED = 50,
  UNKNOWN_EXCEPTION = 99,
  NOT_REGISTER = -1,
  NOT_LOGIN = -2,
  NO_PERMISSION = -3,
  INVALID_PARAM = -4,
  IMAGE_UPLOAD_FAIL = -5,
  DOWNLOADING_FILE_NOT_EXITS = -6,
  USERNAME_EXISTS = -7,
  WRONG_CREDENTIALS = -8,
  WRONG_PASSWORD = -9,
  USER_NOT_EXISTS = -10,
  VERIFICATION_CODE_MISMATCH = -11,
  NUMBER_EXISTS = -12,
  NUMBER_NOT_EXIST = -13,
  ROLE_HEADER_MISSING = -14,
  CLASSROOM_NOT_AVAILABLE = -15,
  TEACHER_NOT_AVAILABLE = -16,
  DROP_COURSE_NOT_FOUND = -17,
  STUDENT_NOT_AVAILABLE = -18,
  COURSE_HAS_BEEN_CHOSEN = -19,
  COURSE_STUDENT_SEMESTER_MISMATCH = -20,
  FUNCTION_DISABLED = -21
}

export const enum GenderEnum {
  SECRETE = "保密",
  MALE = "男",
  FEMALE = "女"
}

export const enum RoleEnum {
  ADMINISTRATOR = "ADMINISTRATOR",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}
