export type FormGeneratorData = {
    type:string,
    placeholder?:string,
    name:string,
    required?:boolean,
    value?:string,
    values?:string[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    reference?:Function,
    elementProps?:unknown,
    label?:string
}