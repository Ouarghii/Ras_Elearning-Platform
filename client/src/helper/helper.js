import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export function attemps_Number(result) {
    return result.filter(r => r !== undefined).length
}

export function earnPoints_Number(result, answers) {
    return result.map((element, i) => answers[i] === element)
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 80 / 100) < earnPoints /*earn 80% marks */
}

/**check user auth */
export function checkUserExist({ children,auth}) {
    return auth ? children : <Link to='/' replace={true}></Link>
}
