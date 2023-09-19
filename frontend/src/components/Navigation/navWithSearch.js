export const NavWithSearch = ({ focus }) => {


    return (
        <ul className="nav-bar">
            <li className="leftNav">
                <NavLink exact to="/">
                    <i className="fa-solid fa-tree">
                        Retreets</i></NavLink>
            </li>
            <li>
                <div></div>
                <div></div>
                <div></div>
            </li>
            <div className="rightNav">
                <li>{sessionUser && <NavLink exact to="/spots/new">Make your Home a Retreet</NavLink>}</li>
                <li >
                    <ProfileButton user={sessionUser} />
                </li>
            </div>
        </ul>
    )

}
