import React from "react";
import Footer from "../Layout/Footer";
import AddContact from "./AddContact";
import AddRandomContact from "./AddRandomComponent";
import FavouriteContacts from "./FavouriteContacts";
import GeneralContact from "./GeneralContact";
import RemoveAllContact from "./RemoveAllContact";

class ContactIndex extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            contactList: [
                {
                    id:1,
                    name: "Aman Bargir ",
                    phone: "666-666-7770",
                    email: "aman@reactapp.com",
                    isFavourite: false,
                },
                {
                    id:2,
                    name: "Suman Saurabh ",
                    phone: "111-222-7770",
                    email: "suman@reactapp.com",
                    isFavourite: true,
                },
                {
                    id:3,
                    name: "Sachin Asodekar ",
                    phone: "999-222-1120",
                    email: "aman@reactapp.com",
                    isFavourite: true,
                },
            ],
            selectedContact: undefined,
            isUpdating: false
        }
    }

    handleAddContact = (newContact)=>{

        if(newContact.name==""){
            return {status: "failure", msg: "Please Enter a valid name"};
        } else if(newContact.phone==""){
            return {status: "failure", msg:"Please Enter a valid Phone Number"}
        }
        const duplicatedRecord = this.state.contactList.filter((x)=>{
            if(x.name==newContact.name && x.phone==newContact.phone){
                return true;
            }
        })
        if(duplicatedRecord.length>0){
            return {status: "failure", msg:"Duplicate Record"};
        }else{

            const newFinalContact = {
                ...newContact,
                id: this.state.contactList[this.state.contactList.length-1].id+1,
                isFavourite: false,
            };
            this.setState((prevState)=>{
                return{
                    contactList: prevState.contactList.concat([newFinalContact]),
                };
            });
            return {status: "success", msg: "Contact was added successfully"}
        }   

    };

    handleUpdateContact = (updatedContact)=>{

        if(updatedContact.name==""){
            return {status: "failure", msg: "Please Enter a valid name"};
        } else if(updatedContact.phone==""){
            return {status: "failure", msg:"Please Enter a valid Phone Number"}
        }
            this.setState((prevState)=>{
                return{
                    contactList: prevState.contactList.map((obj)=>{
                        if(obj.id == updatedContact.id){
                            return{
                                ...obj,
                                name: updatedContact.name,
                                email: updatedContact.email,
                                phone: updatedContact.phone,
                            };
                        }
                        return obj;
                    }),
                    isUpdating: false,
                    selectedContact: undefined
                };
            });
            return {status: "success", msg: "Contact was updated successfully"}

    };

    handleToggleFavourites = (contact)=>{
       this.setState((prevState)=>{
        return{
            contactList: prevState.contactList.map((obj)=>{
                if(obj.id == contact.id){
                    return{...obj, isFavourite: !obj.isFavourite};
                }
                return obj; 
            }),
        };
       });
    };

    handleDeleteContact = (contactId)=>{
        this.setState((prevState)=>{
            return {
                contactList: prevState.contactList.filter((obj)=>{
                    return obj.id!==contactId;
                })
            };
        });
    };

    handleAddRandomContact = (newContact) =>{
        const newFinalContact = {
            ...newContact,
            id: this.state.contactList[this.state.contactList.length-1].id+1,
            isFavourite: false,
        };
        this.setState((prevState)=>{
            return{
                contactList: prevState.contactList.concat([newFinalContact]),
            };
        });
    };

    handleRemoveAllContact = () =>{
        this.setState((prevState)=>{
            return{
                contactList: [],
            };
        });
    };

    handleUpdateClick = (contact) =>{
        console.log(contact)
        this.setState(()=>{
            return{
                selectedContact: contact,
                isUpdating: true,
            };
        });
    };

    handleCancelUpdateContact = (contact) =>{
        console.log(contact)
        this.setState(()=>{
            return{
                selectedContact: undefined,
                isUpdating: false,
            };
        });
    };
        

    render(){
        return(
            <div className="container" style={{minHeight:"85vh"}}>
                <div className="row py-3">
                    <div className="col-4 offset-2 row">
                        <AddRandomContact handleAddRandomContact = {this.handleAddRandomContact} />
                    </div>
                    <div className="col-4 row">
                        <RemoveAllContact handleRemoveAllContact={this.handleRemoveAllContact} />
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row" >
                        <AddContact
                        isUpdating={this.state.isUpdating}
                        selectedContact={this.state.selectedContact} 
                        handleAddContact={this.handleAddContact} 
                        cancelUpdateContact={this.handleCancelUpdateContact}
                        handleUpdateContact={this.handleUpdateContact}
                        />
                        </div>
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row" >
                        <FavouriteContacts
                         contacts={this.state.contactList.filter((u)=>u.isFavourite==true)}
                         favouriteClick={this.handleToggleFavourites}
                         deleteContact = {this.handleDeleteContact}
                         updateClick={this.handleUpdateClick}
                         />
                        </div>
                    </div>
                    <div className="row py-2">
                    <div className="col-8 offset-2 row" >
                        <GeneralContact 
                        contacts={this.state.contactList.filter((u)=>u.isFavourite==false)}
                        favouriteClick={this.handleToggleFavourites}
                        deleteContact = {this.handleDeleteContact}
                        updateClick={this.handleUpdateClick}
                        />
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default ContactIndex;