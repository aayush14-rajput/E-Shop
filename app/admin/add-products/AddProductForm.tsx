
"use client"
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { categories } from '@/Utils/Categories'
import { colors } from '@/Utils/Color'
import toast from 'react-hot-toast'
import firebaseApp from '@/libs/firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Heading = dynamic(() => import('@/app/Components/Heading'))
const Input = dynamic(() => import('@/app/Components/inputs/Input'))
const TextArea = dynamic(() => import('@/app/Components/inputs/TextArea'))
const CustomCheckBox = dynamic(() => import('@/app/Components/inputs/CustomCheckBox'))
const CategoryInput = dynamic(() => import('@/app/Components/inputs/CategoryInput'))
const SelectColor = dynamic(() => import('@/app/Components/inputs/SelectColor'))
const Button = dynamic(() => import('@/app/Components/Button'))

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
}

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string; // URL of the uploaded image
}

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[]>([])
  const [isProductCreated, setIsProductCreated] = useState(false)

  const router = useRouter()
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: [],
      price: '',
    }
  })

  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }, [setValue])

  useEffect(() => {
    setCustomValue('images', images)
  }, [images, setCustomValue])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages([])
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data", data)
    // Add product creation logic here

    setIsLoading(true)
    let uploadedImages: UploadedImageType[] = []

    if (!data.category) {
      setIsLoading(false)
      return toast.error('Category is not selected')
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false)
      return toast.error('No selected image')
    }

    const handleImageUploads = async () => {
      toast('Creating Product, Please Wait...')

      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name;
            const storage = getStorage(firebaseApp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (error) => {
                  console.log('Error uploading Image', error)
                  reject(error)
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadedImages.push({
                      ...item,
                      image: downloadURL
                    })
                    console.log('File available at', downloadURL);
                    resolve()
                  }).catch((error) => {
                    console.log("Error Getting the download URL", error)
                    reject(error)
                  })
                }
              )
            })
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log('Error Handling image uploads', error)
        return toast.error('Error Handling image uploads')
      }
    }

    await handleImageUploads()

    const productData = { ...data, images: uploadedImages }

    axios.post('/api/product', productData).then(() => {
      toast.success("Product is created")
      setIsProductCreated(true)
      router.refresh()
    }).catch((error) => {
      toast.error('Something went wrong when saving product to DB')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const category = watch('category')

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => [...prev, value])
  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => prev.filter(item => item.color !== value.color))
  }, [])

  const categoryInputs = useMemo(() => (
    categories.map(item => (
      item.label !== 'All' && (
        <div key={item.label} className='col-span'>
          <CategoryInput onClick={() => setCustomValue("category", item.label)} selected={category === item.label} label={item.label} icon={item.icon} />
        </div>
      )
    ))
  ), [categories, category, setCustomValue])

  const colorSelectors = useMemo(() => (
    colors.map((item, index) => (
      <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />
    ))
  ), [colors, addImageToState, removeImageFromState, isProductCreated])

  return (
    <div>
      <Heading title='Add a Product' center />
      <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
      <Input id='price' label='Price' disabled={isLoading} register={register} errors={errors} required type='number' />
      <Input id='brand' label='Brand' disabled={isLoading} register={register} errors={errors} required />
      <TextArea id='description' label='Description' disabled={isLoading} register={register} errors={errors} required />
      <CustomCheckBox id='inStock' register={register} label='This Product is in Stock' />

      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>Select a Category</div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto'>
          {categoryInputs}
        </div>
      </div>

      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>
            Select the available product colors and upload their images.
          </div>
          <div className='text-sm'>
            You must upload an image for each of the color selected otherwise your color selection will be ignored.
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {colorSelectors}
        </div>
      </div>
      <Button label={isLoading ? 'Loading...' : 'Add Product'} onclick={handleSubmit(onSubmit)} />
    </div>
  )
}

export default React.memo(AddProductForm)

