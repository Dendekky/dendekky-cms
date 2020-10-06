export const trimmedPostBody = (postBody, maxChar) => {
  // const maxChar = 150
  if (postBody.length > maxChar) {
    postBody = postBody.substring(0, maxChar)
    postBody = `${postBody.substring(
      0,
      Math.min(postBody.length, postBody.lastIndexOf(' '))
    )} . . .`
  }
  return postBody
}
