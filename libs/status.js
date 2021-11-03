export default function status(code, msg) {
  return {
    status_code: code,
    timestamp: new Date(),
    message: msg,
  }
}
