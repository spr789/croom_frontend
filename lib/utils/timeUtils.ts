export const getISTTimeAndBlock = () => {
    const date = new Date()
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
    const ist = new Date(utc + (3600000 * 5.5))
  
    const hours = ist.getHours().toString().padStart(2, '0')
    const minutes = ist.getMinutes().toString().padStart(2, '0')
    const currentTime = `${hours}:${minutes} (IST)`
  
    const totalMinutes = ist.getHours() * 60 + ist.getMinutes()
    const block = Math.floor(totalMinutes / 15) + 1
  
    return { currentTime, block }
  }
  