export function new2d(row: number, col: number): number[][] {
    let arr: number[][] = [];
    for (let i = 0; i < row; i++) {
        arr.push([]);
        for (let j = 0; j < col; j++) {
            arr[i].push(0);
        }
    }
    return arr;
}
