const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt='));
const jwt = jwtCookie ? jwtCookie.split('=')[1] : null;

const headers = jwt ? {
  'Authorization': `Bearer ${jwt}`,
  'Content-Type': 'application/json'
} : {
  'Content-Type': 'application/json'
}

function submitForm(event, inputIds, url, redirectUrl ) {

    event.preventDefault()

      const formData = {}

      inputIds.map((item) => {
        formData[item] = document.getElementById(item).value 
    })

      fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(formData)
      }).then(res => {
        console.log(res.status)
       /* if(res.status === 200 ){
          window.location.href = redirectUrl
        }*/
      })
      .catch(error => console.error('Error:', error));
  }