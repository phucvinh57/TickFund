import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"
import { useDispatch } from "react-redux"
import { personalService } from "./services/personal.service"
import { initPersonal } from "./redux/slice/personal"
import { toast } from "react-toastify"
import { LoadingPage } from "./pages/loading"
import { useCallback } from "react"
import categoriesService from "./services/categories.service"
import { initCategories } from "./redux/slice/categories"
import { userService } from "./services/user.service"
import { initUsers } from "./redux/slice/users"
import { roleService } from "./services/role.service"
import { initRoles } from "./redux/slice/role"

const LOADING = "LOADING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

export default function Protector({ children }) {
    const dispatch = useDispatch()
    const [applicationState, setApplicationState] = useState(LOADING)

    const initApplicationStates = useCallback(async () => {
        // Check for loggin
        try {
            await authService.checkIfLoggedIn(window.location.href)
        } catch (err) {
            const redirectURL = err.response.data.redirect_url
            if (redirectURL) {
                window.location.href = redirectURL
            } else {
                setApplicationState(REJECTED)
            }
            return
        } finally {
            setApplicationState(REJECTED)
            
        }

        // Get user's personal data (include permission)
        try {
            const response = await personalService.getInfoAndRole()
            dispatch(initPersonal(response.data))
            setTimeout(() => setApplicationState(FULFILLED), 1500)
        } catch (err) {
            setApplicationState(REJECTED)
            return
        }

        // Get category data
        try {
            const response = await categoriesService.getAll()
            dispatch(initCategories(response.data))
        } catch (err) {
            toast.error("Không thể lấy danh sách các danh mục")
        }
        categoriesService.getAll().then((response) => {
            dispatch(initCategories(response.data))
        }).catch(err => toast.error("Không thể lấy danh sách các danh mục"))

        userService.getAllUserInfoWithRole().then(response => {
            dispatch(initUsers(response.data))
        }).catch(err => toast.error("Không thể lấy danh sách các danh mục"))

        roleService.getRoles().then(response => {
            dispatch(initRoles(response.data))
        }).catch(err => toast.error("Không thể load data cho role"))
    }, [dispatch])

    useEffect(() => {
        initApplicationStates()
    }, [dispatch, initApplicationStates])
    return <div>
        {applicationState === LOADING && <LoadingPage />}
        {applicationState === FULFILLED && children}
        {applicationState === REJECTED && <div>Cannot connect to server</div>}
    </div>
}
