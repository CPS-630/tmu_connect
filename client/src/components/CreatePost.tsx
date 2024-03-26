import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import '../style/CreatePost.css'
import { useAuth0 } from '@auth0/auth0-react';
import { FaUpload } from "react-icons/fa";

const CreatePost = (): React.ReactElement => {
    const { user, getAccessTokenSilently } = useAuth0()
    const [images, setImages] = useState<File[]>([])
    const [displayImages, setDisplays] = useState<{ [key: string]: number }>({})
    const [imageError, setImageError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if(Object.keys(displayImages).length === images.length) {
            setIsLoading(false)
        }
    }, [displayImages])

    useEffect(() => {
        setIsLoading(true)
        setDisplays({})
        const newImages: { [key: string]: number } = {}
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (e.target?.result) {
                    newImages[e.target.result.toString()] = i
                    setDisplays(newImages);
                }
            }
            reader.readAsDataURL(images[i])

        }
        
    }, [images])

      const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setImageError("");
        const files = event.target.files;
        if (!files) return;
    
        const filesArray = Array.from(files);
        const maxSize = 10 * 1024 * 1024;
        const newImages: File[] = [];
    
        filesArray.forEach(file => {
            if (maxSize > file.size) {
                newImages.push(file);
            } else {
                setImageError("File can be a maximum of 10mb");
            }
        });
    
        if (newImages.length + images.length > 4) {
            setImageError("Cannot upload more than 4 images.");
            if (event.target) {
                (event.target as HTMLInputElement).value = '';
            }
            return;
        }
        setImages([...images, ...newImages]);

        if (event.target) {
            (event.target as HTMLInputElement).value = ''
        }
    }
    

    const handleImageDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault()
        const updatedImages = [...images]
        updatedImages.splice(index, 1)
        setImages(updatedImages)
    }

    const handleCreatePost = (async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement

        const formData = {
            title: form.adTitle.value,
            adType: form.adType.value,
            description: form.description.value,
            location: form.location.value,
            categories: form.categories.value.split(/,\s*/),
            price: parseFloat(form.price.value)
        }

        let token: string
        try {
            token = await getAccessTokenSilently()
          } catch (e) {
            return
        }

        fetch(`http://localhost:8080/user/${user?.sub}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                console.error('User not found')
            }
            return response.json()
        })

        fetch('http://localhost:8080/post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(async response => {
            if (response.status !== 201) {
                console.error('Ad could not be posted')
            } else {
                const jsonResponse = await response.json()
                const postID = jsonResponse.postId
                uploadImages(postID, token)
                return jsonResponse
            }
            
        })
    })

    const uploadImages = async (postID: string, token: string) => {
        console.log(postID)

        var formData = new FormData()
        images.forEach(image => {
            formData.append('post-images', image)
        })

        fetch(`http://localhost:8080/post/image/upload/${postID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(async response => {
            if (!response.ok) {
                console.error('Images could not be uploaded')
            } else {
                window.location.href = `/listing/${postID}`
            }
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <div className='create-post'>
            <h2>Post An Ad</h2>
            <form id="adForm" onSubmit={handleCreatePost}>
                <label htmlFor="adTitle">Title:</label>
                <input type="text" id="adTitle" name="adTitle" required maxLength={200} onKeyDown={handleKeyDown}/>
                <br/>

                <label htmlFor="imageUpload" className="uploadLabel">Upload Images (up to 4):</label>
                <div id="imageUpload">
                        <div id="arrowWrapper">
                            <div id="uploadArrow"><FaUpload /></div>
                        </div>
                    <input type="file" id="adImages" name="adImages" multiple onChange={handleImageUpload}
                        accept="image/jpeg, image/jpg, image/png"/>
                </div>
                {imageError && <div id="imageError">{imageError}</div>}
                <div id="imagePreview">
                    {isLoading ? (
                        <></>
                    ) : (
                        Object.keys(displayImages).map((key) => (
                            <div className="uploadedImages">
                                <img key={key} src={key} />
                                <button onClick={(event) => handleImageDelete(event, displayImages[key])}>X</button>
                            </div>
                        ))
                    )}
                </div>
                <br/>

                <label htmlFor="adType">Ad Type:</label>
                <select id="adType" name="adType" required>
                    <option value="S">Selling</option>
                    <option value="W">Wanted</option>
                    <option value="A">Academic Service</option>
                </select>
                <br/>

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
                <br/>

                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" required onKeyDown={handleKeyDown}/>
                <br/>

                <label htmlFor="categories">Categories:</label>
                <input type="text" id="categories" name="categories" required onKeyDown={handleKeyDown}/>
                <br/>

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" required min="0" step="0.01" onKeyDown={handleKeyDown}/>
                <br/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePost