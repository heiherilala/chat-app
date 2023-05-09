import LoginForm from '@/component/LoginFormState'
/*
const takeDataSession = ()=>{
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem('try')
    }
    return null
  }
*/
export default function Herilala() {
  return (
    <div>
        {localStorage.getItem('try')&&<button>misy</button>}
        <LoginForm />
    </div>
  )
}
