import '../socket.io/socket.io.js'

const issueTemplate = document.querySelector('#issue-template')

const baseURL = document.querySelector('base').getAttribute('href')

// Only open socket when the template is present.
if (issueTemplate) {
  const socket = window.io({ path: `${baseURL}socket.io` })

  socket.on('issueEvent', data => {
    // To determine which page user is currently viewing
    const onOpenPage = document.querySelector('#openIssues')
    const onClosedPage = document.querySelector('#closedIssues')

    // When an issue is closed
    if (data.action === 'close') {
      if (onOpenPage) {
        removeFromPage(data)
      } else if (onClosedPage) {
        addToPage(data)
      }
      // When an issue is updated
    } else if (data.action === 'update') {
      console.log('AN ISSUE NEEDS UPDATING')
      updateOnPage(data)
    } else {
      // When an issue is opened or re-opened
      if (onOpenPage) {
        addToPage(data)
      } else if (onClosedPage) {
        removeFromPage(data)
      }
    }
  })
}

/**
 * Remove issue from the page.
 *
 * @param {object} data - of current issue.
 */
function removeFromPage (data) {
  const issueSectionToRemove = document.querySelector(`#issue_${data.iid}`)
  if (issueSectionToRemove) {
    issueSectionToRemove.remove()
  }
}

/**
 * Update an already rendered issue.
 *
 * @param {object} data - of current issue.
 */
function updateOnPage (data) {
  const issueSection = document.querySelector(`#issue_${data.iid}`)
  issueSection.innerHTML = ''

  const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)
  const issueString = hbsTemplate(data)
  issueSection.innerHTML = issueString
  console.log(issueSection)
}

/**
 * Add issue to page.
 *
 * @param {object} data - of current issue.
 */
function addToPage (data) {
  const issueAlreadyOnPage = document.querySelector(`#issue_${data.iid}`)

  if (!issueAlreadyOnPage) {
    const hbsTemplate = window.Handlebars.compile(issueTemplate.innerHTML)
    const issueString = hbsTemplate(data)

    const section = document.createElement('section')
    section.id = `issue_${data.iid}`
    section.innerHTML = issueString
    console.log(section)

    const wrapper = document.querySelector('#sectionsWrapper')
    wrapper.appendChild(section)
  }
}
