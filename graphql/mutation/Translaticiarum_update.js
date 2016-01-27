import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { GraphQLInt, GraphQLID, GraphQLNonNull } from "graphql";

import GraphQLDateTime from "../scalar/GraphQLDateTime";

import { DA_User_get } from '../../data/da/User';
import { DA_Translaticiarum_get, DA_Translaticiarum_update } from '../../data/da/Translaticiarum';

import TranslaticiarumType from '../type/TranslaticiarumType';

export default mutationWithClientMutationId( {
  name: 'Translaticiarum_update',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
    Translaticiarum_Time: { type: new GraphQLNonNull( GraphQLDateTime ) },
    Translaticiarum_Type: { type: new GraphQLNonNull( GraphQLInt ) },
  },
  outputFields: {
    Translaticiarum: {
      type: TranslaticiarumType,
      resolve: ( {localTranslaticiarumId} ) => DA_Translaticiarum_get( localTranslaticiarumId ),
    }
  },
  mutateAndGetPayload: ( {id, text} ) => {
    var localTranslaticiarumId = fromGlobalId(id).id;
    return DA_Translaticiarum_update( localTranslaticiarumId, {
      Translaticiarum_Time: Translaticiarum_Time,
      Translaticiarum_Type: Translaticiarum_Type
    } )
    .then( ( ) => ( {localTranslaticiarumId} ) )
    ;
  },
} );
