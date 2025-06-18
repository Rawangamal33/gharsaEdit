import { useEffect, useState } from "react"
import styles from "./account.module.scss"
import instance from "../../axios"
const Acount = () => {
    const [user,setUser] = useState(null)

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const response = await instance.get(`Account/${"fd6ed66f-419b-4d1d-9405-4513466b222d"}`)
                setUser(response.data.data)
            }catch{
                return;
            }
        }
        fetchUser()
    },[])
  return (
    <div className={styles["account-container"]}>
        <div className={styles["account-items"]}>
            <div className={styles["image"]}>
                <img src={user?.imageCover} alt="avatar"/>
            </div>
            <div className={styles.details}>
                <ul>
                    <li>البريد الإلكتروني : {user?.email}</li>
                    <li>الإسم : {user?.displayName}</li>
                    <li>المحافظة : {user?.governorate}</li>
                    <li>المدينة : {user?.city}</li>
                    <li>رقم الهاتف : {user?.mobile}</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Acount