import '../socket.io/socket.io.js'

console.log('HELLOOOOO CLIENT!')

// var source = ''
const issueTemplate = document.querySelector('#issue-template')

const baseURL = document.querySelector('base').getAttribute('href')
// console.log(baseURL)
// const base = document.querySelector('base')
// console.log(base)
// const href = document.querySelector('base').href
// console.log(href)

if (issueTemplate) {
  // var template = Handlebars.compile(source);
  const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)

  const socket = window.io({ path: `${baseURL}socket.io` })
  console.log(socket)

  socket.on('issueEvent', data => {
    if (data.action === 'close') {
      console.log(`Close ${data.iid}`)
      // REmove from the DOM
      const sectionToRemove = document.querySelector(`#issue_${data.iid}`)
      sectionToRemove.remove()
    } else {
      console.log(`ELSE ${data.iid}`)
      const issueString = hbsTemplate(data)
      const section = document.createElement('section')
      section.id = `issue_${data.iid}`
      // console.log(section)
      section.innerHTML = issueString
      // console.log(section)

      const wrapper = document.querySelector('#sectionsWrapper')
      wrapper.appendChild(section)
    }
  })
}

console.log('HELLO AGAIN')
