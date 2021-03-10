import '../socket.io/socket.io.js'

console.log('HELLOOOOO CLIENT!')

// var source = ''
const issueTemplate = document.querySelector('#issue-template')
const baseURL = document.querySelector('base').getAttribute('href')

if (issueTemplate) {
  // var template = Handlebars.compile(source);
  const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)
  console.log(hbsTemplate)

  const socket = window.io({ path: `${baseURL}socket.io` })

  socket.on('issueEvent', data => {
    console.log(`Data: ${data}`)
    console.log(`Data: ${data.iid}`)
    console.log(`Data: ${data.title}`)
    // var data = { ...

    // var result = template(data);
    const issueString = hbsTemplate(data)
    console.log('issueString/result: ' + issueString)
    const section = document.createElement('section')
    console.log(section)
    section.innerHTML = issueString
    console.log(section)

    const wrapper = document.querySelector('#sectionsWrapper')
    wrapper.appendChild(section)
  })
}

console.log('HELLO AGAIN')
