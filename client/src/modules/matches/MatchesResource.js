import CRUDResource from '../../shared/CRUDResource';

import { SERVER } from '../../shared/Constants';

class MatchesResource extends CRUDResource {
  constructor() {
    super(SERVER.API_URL + '/matches');
  }
}

let matchesResource = new MatchesResource();

export default matchesResource;
