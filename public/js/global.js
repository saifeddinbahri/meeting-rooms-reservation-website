
function submitForm(event, inputIds, url, redirectUrl ) {

    event.preventDefault()

      const formData = {}

      inputIds.map((item) => {
        formData[item] = document.getElementById(item).value 
    })

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      }).then(res => {
        console.log(res.status)
       /* if(res.status === 200 ){
          window.location.href = redirectUrl
        }*/
      })
      .catch(error => console.error('Error:', error));
  }