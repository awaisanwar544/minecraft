import './App.css';
import { useEffect, useState } from 'react';

// stanmpl

function App() {
  const [whitelistedUser, setWhitelistedUser] = useState([])
  const [username, setUsername] = useState(null)
  const [error, setError] = useState(null)
  const [fetchingUser, setFetchingUser] = useState(false)
  const API_URL = 'https://api.mojang.com/users/profiles/minecraft/'
  const buttonColor = !!fetchingUser ? '"bg-gray-500 hover:bg-gray-700' : 'bg-blue-500 hover:bg-blue-700'

  const handleAddPlayer = async (e) => {
    e.preventDefault()
    const inputVal = !username ? '' : username.trim('')
    if (inputVal.length < 1) {
      setError('Please enter username')
      return
    }
    setFetchingUser(true)
    const response = await fetch(`${API_URL}${inputVal}`)
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      setWhitelistedUser([...whitelistedUser, data])
      setFetchingUser(false)
    })
    .catch((err) => {
      console.log(err)
      setError(err.message)
      setFetchingUser(false)
    })
  }

  const deletePlayer = (id) => {
    setWhitelistedUser(whitelistedUser.filter((player) => player["id"] !== id))
  }

  return (
    <div className="p-2 w-full text-center">
      <div className="w-1/2">
        {whitelistedUser.length > 0 ?
          <div>
            {whitelistedUser.map((user, index) => {
              return <>
                <div className="flex gap-4" key={user["id"]}>
                  <p>{index + 1}.</p>
                  <p>{user["name"]}</p>
                  <p>{user["id"]}</p>
                  <p className="text-red-500 cursor-pointer"
                  onClick={() => {deletePlayer(user["id"])}}
                  > X </p>
                </div>
              </>
            })}
          </div>
        :  
          <p>No user exist</p>
        }
      </div>

      <div className="flex flex-col">
        <input type="text" placeholder="Enter player username" onKeyUp={(e) => {setUsername(e.target.value)}}/>
        {!!error &&
          <small className="text-red-500">{error}</small>
        }
        <button
          className={`${buttonColor} text-white font-bold py-2 px-4 rounded`}
          onClick={handleAddPlayer}
          disabled={fetchingUser}
          >
            Add to whilisted user
        </button>
      </div>
    </div>
  );
}

export default App;
