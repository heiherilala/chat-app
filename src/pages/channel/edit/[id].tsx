import { useRouter } from 'next/router'
 
export default function Edit() {
  const router = useRouter()
  return <p>Post: {router.query.id}</p>
}