import React, {useEffect, useState} from 'react'
import { Container } from '../components/index.js'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import Postform from "../components/Postform.jsx"

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <Postform post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost