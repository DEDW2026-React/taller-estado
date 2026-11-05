import { useState } from 'react'

export default function MeGusta() {
  const [likes, setLikes] = useState(0)

  function handleClick() {
    setLikes(likes + 1)
  }

  return (
    <button className="big" onClick={handleClick}>
      ❤️ {likes}
    </button>
  )
}
