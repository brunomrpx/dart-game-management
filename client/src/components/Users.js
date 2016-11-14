import React, { Component } from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentCreate from 'material-ui/svg-icons/content/create';

const users = [{
  'id': 1,
  'username': 'jbailey0',
  'name': 'Juan Bailey',
  'email': 'jbailey0@arizona.edu'
}, {
  'id': 2,
  'username': 'ptaylor1',
  'name': 'Philip Taylor',
  'email': 'ptaylor1@youtube.com'
}, {
  'id': 3,
  'username': 'gflores2',
  'name': 'Gregory Flores',
  'email': 'gflores2@cdbaby.com'
}, {
  'id': 4,
  'username': 'sryan3',
  'name': 'Susan Ryan',
  'email': 'sryan3@cocolog-nifty.com'
}, {
  'id': 5,
  'username': 'aolson4',
  'name': 'Angela Olson',
  'email': 'aolson4@mail.ru'
}, {
  'id': 6,
  'username': 'baustin5',
  'name': 'Brandon Austin',
  'email': 'baustin5@nationalgeographic.com'
}, {
  'id': 7,
  'username': 'sdavis6',
  'name': 'Sarah Davis',
  'email': 'sdavis6@sitemeter.com'
}, {
  'id': 8,
  'username': 'lreynolds7',
  'name': 'Lisa Reynolds',
  'email': 'lreynolds7@issuu.com'
}, {
  'id': 9,
  'username': 'kramos8',
  'name': 'Karen Ramos',
  'email': 'kramos8@reuters.com'
}, {
  'id': 10,
  'username': 'ashaw9',
  'name': 'Andrea Shaw',
  'email': 'ashaw9@google.pl'
}, {
  'id': 11,
  'username': 'amendozaa',
  'name': 'Anthony Mendoza',
  'email': 'amendozaa@constantcontact.com'
}, {
  'id': 12,
  'username': 'bfloresb',
  'name': 'Betty Flores',
  'email': 'bfloresb@wordpress.com'
}, {
  'id': 13,
  'username': 'jpaynec',
  'name': 'Julie Payne',
  'email': 'jpaynec@live.com'
}, {
  'id': 14,
  'username': 'jbaileyd',
  'name': 'Janet Bailey',
  'email': 'jbaileyd@hostgator.com'
}, {
  'id': 15,
  'username': 'aturnere',
  'name': 'Antonio Turner',
  'email': 'aturnere@163.com'
}, {
  'id': 16,
  'username': 'rchapmanf',
  'name': 'Richard Chapman',
  'email': 'rchapmanf@chron.com'
}, {
  'id': 17,
  'username': 'ddeang',
  'name': 'Donald Dean',
  'email': 'ddeang@nyu.edu'
}, {
  'id': 18,
  'username': 'lkelleyh',
  'name': 'Lori Kelley',
  'email': 'lkelleyh@twitpic.com'
}, {
  'id': 19,
  'username': 'dgriffini',
  'name': 'Daniel Griffin',
  'email': 'dgriffini@cbc.ca'
}, {
  'id': 20,
  'username': 'abakerj',
  'name': 'Aaron Baker',
  'email': 'abakerj@de.vu'
}, {
  'id': 21,
  'username': 'rcunninghamk',
  'name': 'Ronald Cunningham',
  'email': 'rcunninghamk@abc.net.au'
}, {
  'id': 22,
  'username': 'rcarpenterl',
  'name': 'Richard Carpenter',
  'email': 'rcarpenterl@ovh.net'
}, {
  'id': 23,
  'username': 'msnyderm',
  'name': 'Marie Snyder',
  'email': 'msnyderm@odnoklassniki.ru'
}, {
  'id': 24,
  'username': 'mjamesn',
  'name': 'Marilyn James',
  'email': 'mjamesn@comsenz.com'
}, {
  'id': 25,
  'username': 'dpowello',
  'name': 'Diana Powell',
  'email': 'dpowello@businessweek.com'
}, {
  'id': 26,
  'username': 'rlanep',
  'name': 'Ruby Lane',
  'email': 'rlanep@techcrunch.com'
}, {
  'id': 27,
  'username': 'rgonzalesq',
  'name': 'Ryan Gonzales',
  'email': 'rgonzalesq@soup.io'
}, {
  'id': 28,
  'username': 'gpattersonr',
  'name': 'Gerald Patterson',
  'email': 'gpattersonr@soundcloud.com'
}, {
  'id': 29,
  'username': 'bsullivans',
  'name': 'Benjamin Sullivan',
  'email': 'bsullivans@smugmug.com'
}, {
  'id': 30,
  'username': 'areyest',
  'name': 'Albert Reyes',
  'email': 'areyest@buzzfeed.com'
}, {
  'id': 31,
  'username': 'jpayneu',
  'name': 'Jennifer Payne',
  'email': 'jpayneu@godaddy.com'
}, {
  'id': 32,
  'username': 'ccolemanv',
  'name': 'Christina Coleman',
  'email': 'ccolemanv@timesonline.co.uk'
}, {
  'id': 33,
  'username': 'lreynoldsw',
  'name': 'Linda Reynolds',
  'email': 'lreynoldsw@php.net'
}, {
  'id': 34,
  'username': 'cburtonx',
  'name': 'Craig Burton',
  'email': 'cburtonx@seattletimes.com'
}, {
  'id': 35,
  'username': 'svasquezy',
  'name': 'Steve Vasquez',
  'email': 'svasquezy@gov.uk'
}, {
  'id': 36,
  'username': 'jbutlerz',
  'name': 'Jeremy Butler',
  'email': 'jbutlerz@pagesperso-orange.fr'
}, {
  'id': 37,
  'username': 'dbaker10',
  'name': 'Donna Baker',
  'email': 'dbaker10@infoseek.co.jp'
}, {
  'id': 38,
  'username': 'srobinson11',
  'name': 'Steve Robinson',
  'email': 'srobinson11@blog.com'
}, {
  'id': 39,
  'username': 'nreynolds12',
  'name': 'Nicholas Reynolds',
  'email': 'nreynolds12@google.de'
}, {
  'id': 40,
  'username': 'dkelley13',
  'name': 'Dennis Kelley',
  'email': 'dkelley13@nasa.gov'
}, {
  'id': 41,
  'username': 'jnichols14',
  'name': 'Juan Nichols',
  'email': 'jnichols14@washingtonpost.com'
}, {
  'id': 42,
  'username': 'aarmstrong15',
  'name': 'Andrea Armstrong',
  'email': 'aarmstrong15@apache.org'
}, {
  'id': 43,
  'username': 'howens16',
  'name': 'Howard Owens',
  'email': 'howens16@narod.ru'
}, {
  'id': 44,
  'username': 'smarshall17',
  'name': 'Shawn Marshall',
  'email': 'smarshall17@google.com'
}, {
  'id': 45,
  'username': 'kwalker18',
  'name': 'Kathleen Walker',
  'email': 'kwalker18@loc.gov'
}, {
  'id': 46,
  'username': 'hbaker19',
  'name': 'Helen Baker',
  'email': 'hbaker19@artisteer.com'
}, {
  'id': 47,
  'username': 'pmccoy1a',
  'name': 'Patricia Mccoy',
  'email': 'pmccoy1a@marriott.com'
}, {
  'id': 48,
  'username': 'lthomas1b',
  'name': 'Lillian Thomas',
  'email': 'lthomas1b@angelfire.com'
}, {
  'id': 49,
  'username': 'lford1c',
  'name': 'Linda Ford',
  'email': 'lford1c@weebly.com'
}, {
  'id': 50,
  'username': 'wbishop1d',
  'name': 'William Bishop',
  'email': 'wbishop1d@flickr.com'
}];

export class NewUser extends Component {
  render() {
    return (
      <h1>New User</h1>
    )
  }
}

// export NewUser;

export default class Users extends Component {
  render() {
    const style = {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      width: 56,
      position: 'fixed',
    };

    return (
      <div>
        <div style={style}>
          <FloatingActionButton style={{ marginTop: 15 }}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginTop: 15 }} backgroundColor={'red'} disabled={true}>
            <ContentRemove />
          </FloatingActionButton>
          <FloatingActionButton style={{ marginTop: 15 }} backgroundColor={'orange'} disabled={true}>
            <ContentCreate />
          </FloatingActionButton>
        </div>
        <Table multiSelectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(u => {
              return (
                <TableRow key={u.id}>
                  <TableRowColumn>{u.username}</TableRowColumn>
                  <TableRowColumn>{u.name}</TableRowColumn>
                  <TableRowColumn>{u.email}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}
