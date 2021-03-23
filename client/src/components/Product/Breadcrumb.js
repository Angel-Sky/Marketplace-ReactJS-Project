import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BreadcrumbNav({ params }) {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to={`/categories/${params.category}`}>{params.category}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
                <Link to={`/categories/${params.category}/${params.id}/details`}>{params.title}</Link>
            </Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BreadcrumbNav;