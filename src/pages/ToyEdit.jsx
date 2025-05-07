import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/actions/toy.actions.js"
import * as Yup from 'yup';
import { cloudinaryService } from "../services/cloudinary-service.js"


const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    price: Yup.number()
        .min(0, 'Must be 0 or more')
        .required('Required'),
})

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        if (type === 'number') value = +value
        if (type === 'checkbox' && field === 'inStock') value = checked
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Had issues saving toy')
            })
    }

    function onUploadImg(ev) {
        const file = ev.target.files[0]
        if (!file) return

        cloudinaryService.uploadImg(file)
            .then(url => {
                setToyToEdit(prevToy => ({ ...prevToy, imgUrl: url }))
                showSuccessMsg('Image uploaded successfully!')
            })
            .catch(err => {
                console.error('Upload failed', err)
                showErrorMsg('Failed to upload image')
            })
    }


    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <label htmlFor="imgUpload">Upload Image:</label>
                <input type="file" id="imgUpload" onChange={onUploadImg} />


                <label htmlFor="inStock">In Stock:</label>
                <input type="checkbox"
                    name="inStock"
                    id="inStock"
                    checked={toyToEdit.inStock}
                    onChange={handleChange}
                />

                <label>Labels:</label>
                <div className="labels-checkboxes">
                    {labels.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                value={label}
                                checked={toyToEdit.labels.includes(label)}
                                onChange={({ target }) => {
                                    const updatedLabels = target.checked
                                        ? [...toyToEdit.labels, target.value]
                                        : toyToEdit.labels.filter(l => l !== target.value)

                                    setToyToEdit(prevToy => ({
                                        ...prevToy,
                                        labels: updatedLabels
                                    }))
                                }}
                            />
                            {label}
                        </label>
                    ))}
                </div>


                <div className="form-actions">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
            {/* 
            <Formik
                initialValues={{
                    toyName: '',
                    price: 0,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    console.log("values: ", values)
                    onSaveToy(values)
                }}>

                {({ errors, touched, dirty }) => {
                    const validationClass = formValidationClass(errors, touched)
                    return (
                        <Form className={`formik ${validationClass}`}>
                            <label htmlFor="toyName">Toy Name</label>
                            <Field id="toyName" name="toyName" placeholder="" />
                            {errors.toyName && touched.toyName && (
                                <div className="errors">{errors.toyName}</div>
                            )}
                            <label htmlFor="price">Price</label>
                            <Field id="price" name="price" placeholder="Price.." />
                            {errors.price && touched.price && (
                                <div className="errors">{errors.price}</div>
                            )}
                            <button type="submit" >{toyToEdit._id ? 'Save' : 'Add'}</button>
                        </Form>
                    )
                }}
            </Formik> */}


        </section>
    )
}


