import {Friend, Colleague, Emailcontact } from './myTypes'
import { friends, colleagues } from "./01-basics";

// Return a string describing the new age of the friend (e.g. "Michael Gerber is now 32")
function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

// Return an array of strings describing the new ages of the friends (e.g. "Michael Gerber is now 32")
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

// Add a colleague to the current colleagues list (with a new extension number) and return the new colleague
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

// Sort colleagues by name length (shortest first) and return an array of email contacts
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

// Find friends by criteria (name starts with "Mo", age less than 35)
function findFriends(friendsArray: Friend[], criteriaCallback: (friend: Friend) => boolean) {
  return friendsArray.filter(criteriaCallback).map((friend) => friend.name);
}

console.log(findFriends(friends, (friend) => friend.name.startsWith("Mo")));
console.log(findFriends(friends, (friend) => friend.age < 35));

// Add an interest to a friend (if they don't already have it)
function addInterest(friend: Friend, interest: string) {
  if (friend.interests === undefined) {
    friend.interests = [];
  }
  friend.interests.push(interest);
  return friend.interests;
}

console.log(addInterest(friends[1], "Politics"));