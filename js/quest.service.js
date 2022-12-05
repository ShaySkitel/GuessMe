'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  const questsObj = loadFromStorage('questDB')
  if (questsObj) {
    gQuestsTree = questsObj
    gCurrQuest = gQuestsTree
    gPrevQuest = null
  } else {
    console.log('CREATING')
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    gCurrQuest = gQuestsTree
    gPrevQuest = null
    saveToStorage('questDB', gQuestsTree)
  }
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = getCurrQuest()
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  console.log('gCurrQuest[lastRes]:', gCurrQuest[lastRes])
  gPrevQuest[lastRes] = createQuest(newQuestTxt)
  gPrevQuest[lastRes].yes = createQuest(newGuessTxt)
  gPrevQuest[lastRes].no = gCurrQuest
  saveToStorage('questDB', gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
