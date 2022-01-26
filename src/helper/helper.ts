const url = 'https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple'

export const request = fetch(url)
  .then((resp) => resp.json())
  .catch(function (error) {
    console.log(error)
  })

