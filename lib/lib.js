/*
  Docs to codehelper.api at
  https://docs.chelper.tk
*/

const axios = require("axios")

function get(tag) {
  const url = 'https://www.chelper.tk/api/tag/' + tag;
  return axios.get(url).then(response => {
    return response.data
  }).catch(error => {
    console.error(error)
  })
}

function alltags() {
  const url = 'https://www.chelper.tk/api/alltags'
  return axios.get(url).then(response => {
    return response.data
  }).catch(error => {
    console.error(error)
  })
}

function create(options) {
  let name = options.name
  let content = options.content
  let author = options.author
  if(!name || !content || !author || isNaN(author) || author.length < 18 || author.length > 18) {
    console.error('invalid tag options!')
  } else {
    name = name.split(/\s/).join('');
    axios.post('https://www.chelper.tk/api/newTag', {
      name: name,
      content: content,
      author: author
    }).then(res => {
      console.log(res.status)
    }).catch(error => {
      console.error(error)
    })
  }
}

function user(userid) {
  let url = 'https://www.chelper.tk/api/users/' + userid;
  return axios.get(url).then(response => {
    return response.data
  }).catch(error => {
    console.error(error)
  })
}

module.exports = {
  get,
  create,
  alltags,
  user
}