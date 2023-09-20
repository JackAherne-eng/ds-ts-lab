import {Friend, Colleague, Emailcontact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(friendsArray: Friend[]) {
    return friendsArray.map(friend => {
      friend.age += 1;
      return `${friend.name} is now ${friend.age}`;
    });
  }
  
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
console.log(highestExtension(colleagues.current));

function addColleague(colleagueArray: Colleague[], name: string, department: string, email: string) {
  const highest = highestExtension(colleagues.current);
  const newExtension = highest.contact.extension + 1;
  const newColleague = {
    name,
    department,
    contact: {
      email,
      extension: newExtension,
    },
  };
  colleagueArray.push(newColleague);
}
addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"))

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): Emailcontact[] {
  let end = colleagues.length;
  if (max !== undefined) {
     end = max < 2 ? 1 : max
  }
  const sorted = colleagues.sort(sorter);
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0,end)
}
// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

function findFriends(friendsArray: Friend[], criteriaCallback: (friend: Friend) => boolean) {
  return friendsArray.filter(criteriaCallback).map((friend) => friend.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith("Mo")));
console.log(findFriends(friends, (friend) => friend.age < 35));