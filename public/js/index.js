import '../socket.io/socket.io.js'

console.log('HELLOOOOO CLIENT!')

const issueTemplate = document.querySelector('#issue-template')

if (issueTemplate) {
  const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)

  const baseURL = document.querySelector('base').getAttribute('href')

  const socket = window.io({ path: `${baseURL}socket.io` })

  socket.on('issueEvent', arg => {
    console.log(arg)
    const issueString = hbsTemplate(arg)
    const section = document.createElement('section')
    section.innerHTML = issueString

    const wrapper = document.querySelector('#sectionsWrapper')
    wrapper.appendChild(section)
  })
}

console.log('HELLO AGAIN')
