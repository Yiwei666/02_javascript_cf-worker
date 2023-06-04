addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const ip = request.headers.get('CF-Connecting-IP')
  const response = await fetch(`https://ipapi.co/${ip}/country_name/`)
  const response_2 = await fetch(`https://ipapi.co/${ip}/city/`)
  const country = await response.text()
  const city = await response_2.text()
  const date = new Date()

  // Get current time in Beijing time
  const beijingOffset = 8 // UTC+8
  const beijingHours = (date.getUTCHours() + beijingOffset) % 24
  const beijingMinutes = date.getUTCMinutes()
  const beijingSeconds = date.getUTCSeconds()

  // Get deadline times in Beijing time
  const deadlines = [
    { hour: 11, minute: 30 },
    { hour: 17, minute: 30 },
    { hour: 22, minute: 0 },
  ]
  const beijingDeadlines = deadlines.map(({ hour, minute }) => {
    const deadline = new Date(date)
    deadline.setUTCHours(hour - beijingOffset)
    deadline.setUTCMinutes(minute)
    deadline.setUTCSeconds(0)
    return deadline
  })

  // Calculate remaining time for each deadline
  const remainingTimes = beijingDeadlines.map((deadline, index) => {
    const deadlineStr = deadlines[index].hour + ":" + deadlines[index].minute
    // Calculate remaining time in seconds
    let remaining = Math.floor((deadline - date) / 1000)
    if (remaining < 0) {
      return `<p>Deadline ${deadlineStr} has passed</p>`
    }

    // Convert remaining time to hours, minutes and seconds
    const hours = Math.floor(remaining / 3600)
    remaining -= hours * 3600
    const minutes = Math.floor(remaining / 60)
    remaining -= minutes * 60
    const seconds = remaining

    return `<p>Deadline ${deadlineStr} - ${hours}h ${minutes}m ${seconds}s left</p>`
  })

  // Calculate remaining time until May 23rd, 2025 in total hours and total seconds
  const may23rd2025 = new Date("2025-05-23T00:00:00.000Z");
  const remainingSeconds = Math.floor((may23rd2025 - date) / 1000);
  const remainingHours = Math.floor(remainingSeconds / 3600);

  const message = `<html><body><p>Hello world</p><p>Your IP address is: ${ip}</p><p>Your location is: ${country}, ${city}</p><p>The current time is: ${date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>${remainingTimes.join('')}<p>Days until May 23rd, 2025: ${Math.floor(remainingSeconds / 86400)}</p><p>Remaining time until May 23rd, 2025: ${remainingHours} hours (${remainingSeconds} seconds)</p></body></html>`

  return new Response(message, {
    headers: { 'content-type': 'text/html' },
  })
}
