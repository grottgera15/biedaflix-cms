export default interface ServiceSubError {
    object: string,
    field: string,
    rejectedValue: string | null,
    message: string
}