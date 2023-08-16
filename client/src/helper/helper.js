import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from 'axios'

export function attemps_Number(result) {
    return result.filter(r => r !== undefined).length
}

export function earnPoints_Number(result, answers) {
    return result.map((element, i) => answers[i] === element)
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 80 / 100) <= earnPoints /*earn 80% marks */
}

/**check user auth */
export function checkUserExist({ children,auth}) {
    return auth ? children : <Link to='/' replace={true}></Link>
}



/* get server data */
export async function getServerData(url,callback){
   const data =await (await axios.get(url))?.data
   return callback ? callback(data):data
}

/* post server data */
export async function postServerData(url,result,callback){
    const data =await(await axios.post(url,result))?.data
    return callback ? callback(data):data
}

// getServerData('http://localhost:5000/api/reactquiz/resultReact')