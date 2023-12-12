import { useState } from 'react';
import './ExploreContainer.css';
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, useIonViewDidEnter } from '@ionic/react';
import axios from 'axios';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [users, setUsers] = useState<any>([])
  useIonViewDidEnter(() => {
    axios.get('https://randomuser.me/api/?results=100').then((response) => setUsers(response.data.results)
    )
  }, [])

  function deleteItem(email: string) {
    setUsers(users.filter(user => (user.email !== email)))
  }

  return (
    <div id="container">

      <IonList>
        {users.length > 0 ? users.map((user) => {
          return (<IonItemSliding key={user.id.value + user.name.first + user.name.last}>
            <IonItem >
              <IonLabel> {user.name.first} {user.name.last} </IonLabel>
            </IonItem>
            <IonItemOptions>
              <IonItemOption color="danger" onClick={() => deleteItem(user.email)}>Delete</IonItemOption>
            </IonItemOptions>
          </IonItemSliding>)
        }) : ""}

      </IonList>

    </div >
  );
};

export default ExploreContainer;
