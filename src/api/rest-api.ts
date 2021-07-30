/* tslint:disable */
/* eslint-disable */
// NOTE: const enum是inline内联的，不能用在reactive属性中，不能在模板中使用，所以需要去掉const,直接用enum

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

export enum ExceptionEnum {
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
    FUNCTION_DISABLED = -21,
}

export enum GenderEnum {
    SECRETE = "保密",
    MALE = "男",
    FEMALE = "女",
}

export enum RoleEnum {
    ADMINISTRATOR = "ADMINISTRATOR",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
}

export interface Student {
    id: number;
    createTime: Date;
    updateTime: Date;
    name: string;
    age: number;
    birthday: Date;
}

export interface StudentInputDto {
    id: number;
    name: string;
    age: number;
    birthday: Date;
}
