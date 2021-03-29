export default function LogOut({history}) {
    fetch('/auth/logout')
        .then(res => res.json())
        .then(() => history.push('/'))
}

