import {
    ColleagueV2,
    Friend,
    Buddy,
    Buddylist,
    Administrator,
} from "./myTypes";
import { friends } from "./01-basics";

//=================================================

const colleague1: ColleagueV2 = {
    name: "Ralph Graham",
    department: "Engineering",
    contact: {
        email: "rgraham@company.com",
        extension: 121,
    },
};

const colleague2: ColleagueV2 = {
    name: "Patti Burke",
    department: "Finance",
    contact: {
      email: "pburke@company.com",
      extension: 132,
    },
  };
  
  const colleague3: ColleagueV2 = {
    name: "Dean Sullivan",
    department: "HR",
    contact: {
      email: "dos@company.com",
      extension: 125,
    },
  };

//=================================================

function makeBuddyList(
    name: string,
    buddies: Buddy[],
    admin?: Administrator
): Buddylist {
    return {
        name,
        members: buddies,
        administators: admin,
    } as Buddylist;
    // The as operator above casts an object to a specfic type
}
// Test for makeBuddyList
const myFootballBuddies = makeBuddyList(
    "Football team",
    [colleague1, friends[1], colleague3],
    colleague1
)

const mybandBuddies = makeBuddyList(
    "Band name",
    [colleague1, friends[1]]
    // no administator
)

console.log(myFootballBuddies)
console.log(mybandBuddies)
//---------------------------------
function findBuddyContact(list: Buddylist, name: string): string | undefined{
    for (const buddy of list.members){
        if (buddy.name === name){
            if ("phone" in buddy){
                return buddy.phone;
            }
            else {
                return buddy.contact.email;
            }
        }
        return undefined;
    }
}
// Test for findBuddyContact.
console.log("Contact buddy at: ", findBuddyContact(myFootballBuddies, "Michael Gerber"));

function getBuddyListFriends(list: Buddylist): Friend[]{
    return list.members.filter((buddy) => "phone" in buddy) as Friend[];
}
// Test for getBuddyListFriends
console.log("Friends in buddylist: ", getBuddyListFriends(myFootballBuddies));