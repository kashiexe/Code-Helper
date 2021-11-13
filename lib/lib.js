const axios = require("axios")

function get(tag) {
  const url = 'https://www.chelper.tk/api/tag/' + tag;
  return axios.get(url).then(response => {
    return response.data
  }).catch(error => {
    console.error(error)
  })
}

function alltags(including) {
  if(!including) {
    const url = 'https://www.chelper.tk/api/alltags'
    return axios.get(url).then(response => {
      return response.data
    }).catch(error => {
      console.error(error)
    })
  } else {
    return get(including).then(tag => {
      const url = 'https://www.chelper.tk/api/alltags'
      axios.get(url).then(response => {
        if(response.data.name == tag.name) {
          return true
        } else {
          return false
        }
      }).catch(error => {
        console.error(error)
      })
    })
  }
}

function create(options) {
  let name = options.name
  let content = options.content
  let author = options.author
  if(!name || !console || !author || isNaN(author) || author.length < 18 || author.length > 18) {
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

module.exports = {
  get,
  create
}