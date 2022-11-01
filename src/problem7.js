
function compareStringAscending(a, b) {
  if (a < b) return -1;
  else return 1;
}

function problem7(user, friends, visitors) {
  var answer = [];
  let userInfo = {
    name: user,
    friends: [],
  };
  let recommendedCandidate = {};

  //check friends
  friends.map((friend) => {
    if (userInfo.name === friend[0]) userInfo.friends.push(friend[1]);
    else if (userInfo.name === friend[1]) userInfo.friends.push(friend[0]);
    else {
      if (!recommendedCandidate[friend[0]]) { //신규생성
        recommendedCandidate[friend[0]] = {
          name: friend[0],
          friends: [friend[1]],
          score: 0,
        }
      }
      else {
        recommendedCandidate[friend[0]].friends.push(friend[1]);
      }

      if (!recommendedCandidate[friend[1]]) { //신규생성
        recommendedCandidate[friend[1]] = {
          name: friend[1],
          friends: [friend[0]],
          score: 0,
        }
      }
      else {
        recommendedCandidate[friend[1]].friends.push(friend[0]);
      }
    }
  });

  userInfo.friends.map((element) => {
    let friendsOfFriend = recommendedCandidate[element].friends; //친구의 친구
    friendsOfFriend.map((e) => {
      recommendedCandidate[e].score += 10;
    })
  })

  //check visitors 
  visitors.map((visitor) => {
    if (!recommendedCandidate[visitor]) { //신규생성
      recommendedCandidate[visitor] = {
        name: visitor,
        score: 1,
      }
    }
    else {
      recommendedCandidate[visitor].score++;
    }
  })
  let sortCandidate = [];
  //recommendedCandidate 정렬
  for (const key in recommendedCandidate) {
    if (userInfo.friends.includes(key)) {
      //delete recommendedCandidate[key];
      continue;
    }
    if (recommendedCandidate[key].score > 0) sortCandidate.push(key);
  }

  answer = sortCandidate.sort(function (a, b) {
    const diff = recommendedCandidate[b].score - recommendedCandidate[a].score;
    if (diff === 0) {
      return compareStringAscending(a, b);
    }
    return diff;
  });

  return answer;
}

module.exports = problem7;
