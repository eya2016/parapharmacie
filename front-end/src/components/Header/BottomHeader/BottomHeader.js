import React, { Component } from 'react';
import { 
BrowserRouter as Router,
Switch,
Route,
NavLink,
Link 
} from 'react-router-dom';
import './style.css';
import { base_url } from '../../../constants';
import Contact from '../../Contact';
import Blog from '../../Blog/posts';
import Home from '../../../containers/Home';

class BottomHeader extends Component {

    state = {
        categories: [],
        categoriesAr : []
    }

    componentDidMount() {
        fetch(`${base_url}/category`, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            this.setState({
                  categories: jsonResponse.message
            })
        });
    }


    categoryTree(categories){

        //console.log(categories);

        var categoriesAr = [];
        for(var value of categories){

            categoriesAr.push(
                    <li key={value.slug} className="Column">
                        <NavLink to={`/products/${value.slug}`}>{value.name}</NavLink>
                        {value.children.length > 0 ? (<ul>{this.categoryTree(value.children)}</ul>) : null}
                    </li>
            );
        }

        return categoriesAr;
    }

    render() {

        const cat = this.categoryTree(this.state.categories);

        return (
            <div>
                <div className="BottomHeader">
                        <ul className="Menu">
                            <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
                            <li className="MenuItem">
                                <Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link>
                                
                                <ul className="Dropdown">
                                {cat}
                                </ul>
                            </li>
                            <li className="MenuItem"><Link to="/blog">Nos Dérniers Evènements</Link></li>
                            {/* <li className="MenuItem"><Link to="/marques">Blog</Link></li> */}
                            <li className="MenuItem"><Link to="/contact">Contact</Link></li>
                        </ul>
                </div>

                        <Switch>
                            {/* <Route path="/" component={Home} /> */}
                            {/* <Route exact path="/" component={Home} /> */}
                            <Route path="/blog" component={Blog} />
                            <Route path="/contact" component={Contact} />
                        </Switch>    
            </div>
        );

       
     }
}



export default BottomHeader;