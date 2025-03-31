import { Navigate, Route, Routes } from 'react-router-dom'
import { Authpage } from '../pages/Authpage'


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={ <Authpage /> } />
        <Route path='/*' element= { <Navigate to="/auth/login" />}/>
    </Routes>
  )
}
