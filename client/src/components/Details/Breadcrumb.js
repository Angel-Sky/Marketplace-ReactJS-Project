import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BreadcrumbNav({ params }) {
    return (
        <Breadcrumb>
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
                <Link to={`/categories/${params.category}`}>{params.category}</Link>
            </li>
            <li  className="breadcrumb-item">
                <Link to={`/categories/${params.category}/${params._id}/details`}>{params.title}</Link>
            </li>
        </Breadcrumb>
    )
}

export default BreadcrumbNav;