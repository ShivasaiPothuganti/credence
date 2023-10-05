export type FormGeneratorData = {
    type:string,
    placeholder?:string,
    name:string,
    value?:string,
    values?:string[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    reference?:Function,
    elementProps?:unknown
}