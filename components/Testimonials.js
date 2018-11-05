// LIB
import React from 'react';
import styled from 'styled-components'

// COMPONENTS
import { colorOffLight } from './_theme';

const testimonialList = [
    {
      'name': "Angela",
      'location': "Dorchester - Boston, MA",
      'pic' : 'static/testimonial/angela-seller.png',
      'quote': "It was a really easy experience for me and the transparency and communication throughout the process made me feel in control of the situation. The account manager was extremely professional and diligent to move quickly and address my needs and concerns."
    },
    {
      'name': "Lisa",
      'location': "Forest Park - Springfield, MA",
      'pic' : 'static/testimonial/lisa-seller.png',
      'quote': "The account manager I was assigned to was very knowledgeable and understanding of my situation. I was able to get a fair deal on my house and got the cash three weeks after signing the purchase agreement."
    },
    {
      'name': "Marcus",
      'location': "South Side - Waltham, MA",
      'pic' : 'static/testimonial/marcus-seller.png',
      'quote': "Ever since I inherited the house my mom lived in, the property tax and mortgage payments kept piling up. Purple Facts helped me sell really fast for more money than I expected actually. It was a very smooth process overall, recommended!!"
    },
    {
      'name': "João",
      'location': "Spring Hill - Sommerville, MA",
      'pic' : 'static/testimonial/joao-seller.png',
      'quote': "I felt like I didn’t get the amount of money I wanted for the house but it sure moved fast. I used to rent the property but haven’t been able to get any new tenants for the past 4 months and had to constantly spend money on it. It was great to get paid and not stress about it anymore."
    },
    {
      'name': "William",
      'location': "Mission Hill - Boston, MA",
      'pic' : 'static/testimonial/william-seller.png',
      'quote': "I signed the purchase agreement on a Tuesday, the Monday, after the account manager reached out saying they were ready to move with the closing that could happen the next day. I was hoping to sell fast but it’s crazy how it only took a week. The property was a multifamily home."
    },
]


const StyledTestimonials = styled.div`
    background-color: ${colorOffLight};
    padding: 1em 3em;
    display: grid;
    grid-template-columns: 1fr;
` 

const Quote = styled.div`
    padding: 1em;
    max-width: 800px;    
    margin-left: auto;
    margin-right: auto;
    p.testimonial{
        text-align: left;
        min-height: 130px;
        icon {
            font-size: 2em;
            margin-right: 0.5em;
        }
    }
`

const Person = styled.div`
    width: fit-content;
    float: right;
    img{
        margin-top: 15px;
        margin-right: 2em;
        border-radius: 100%;
    }
    p{
        float: right;
        span{
            display: block;
            font-size: 0.8em;
            color: grey;
        }
    }
`

const GetNext = styled.div`
    text-align: center;
`

class Testimonials extends React.Component {

    constructor(props){
        super(props)
        const currIndx = 0
        this.state = { 
            indx : currIndx,
            selected : testimonialList[currIndx]
        }
    }

    incIndex = () =>{
        const newIndx = (this.state.indx+1) % testimonialList.length
        this.setState({
            indx : newIndx,
            selected : testimonialList[newIndx]
        })
    }

    render(){
        return (
            <StyledTestimonials>
                <h2>Testimonials</h2>

                <Quote>
                    <p className="testimonial">
                        <i className="material-icons">format_quote</i>
                        {this.state.selected.quote}
                    </p>
                    <Person>
                        <img height='65' width='65' src={this.state.selected.pic} title={`${this.state.selected.name} profile picture for Purple Facts`} alt={`${this.state.selected.name} from ${this.state.selected.location} image for Purple Facts Testimonial`} />
                        <p>
                            {this.state.selected.name}
                            <span>{this.state.selected.location}</span>
                        </p>
                    </Person>
                </Quote>

                <GetNext>
                    <a className="noselect" onClick={this.incIndex}>Show more</a>
                </GetNext>


            </StyledTestimonials>

        )
    }

}

export default Testimonials
