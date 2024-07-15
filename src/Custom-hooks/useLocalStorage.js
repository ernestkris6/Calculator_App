import {useState, useEffect} from 'react'


export function useLocalStoragState(initialState, key){

    const [value, setvalue] = useState(function(){
        const storedValue = localStorage.getItem('watched');
          return JSON.parse(storedValue)
        });

    useEffect(function() {
            localStorage.setItem("key", JSON.stringify(value))
    }, [value, key])
        


    return [value, setvalue]

}