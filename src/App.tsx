import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { UnitCard } from './components/common/UnitCard';
import { FieldCell } from './components/common/FieldCell';
import { Battle, BattleField, Team, Target } from './core';
import { UNIT_NAMES, UNIT_TYPES, UnitFactory, Unit } from './core/Units';
import { styles } from './styles';

const unitsList = [
  UNIT_NAMES.SKELETON,
  UNIT_NAMES.SKELETON_MAGE,
  UNIT_NAMES.ARCHIMAGE,
  UNIT_NAMES.BANDIT,
  UNIT_NAMES.MONK,
  UNIT_NAMES.CENTAUR,
  UNIT_NAMES.ELF_ARCHER,
  UNIT_NAMES.SIRENA,
];

const unitFactory = new UnitFactory();

const getRandomUnitsSet = (count: number) => {
  const units: Array<Unit> = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.floor(Math.random() * (unitsList.length - 1 - 0 + 1)) + 0;
    units.push(unitFactory.create(unitsList[rand]));
  }

  return units;
};

interface IProps {}

interface IState {
  currentTeam: Team;
  firstTeam: Team;
  secondTeam: Team;
  globalTeam: Team;
  battleField: BattleField;
  currentUnit: Unit;
  battle: Battle;
  selectedCell: { X: number; Y: number };
  curAction: null | 'move' | 'action';
}

class App extends Component<IProps, IState> {
  public constructor(props: any) {
    super(props);

    const first = new Team(getRandomUnitsSet(6), 'blue');
    const second = new Team(getRandomUnitsSet(6), 'red');
    const battleField = new BattleField(5, 6);
    const battle = new Battle(battleField, first, second);

    this.state = {
      firstTeam: first,
      secondTeam: second,
      battleField,
      currentUnit: battle.getGlobalTeam().getCurrent(),
      currentTeam: battle.getCurrentTeam(),
      battle: battle,
      selectedCell: { X: 0, Y: 0 },
      curAction: null,
      globalTeam: battle.getGlobalTeam(),
    };
  }

  private _renderTeam(team: Team | null) {
    const { currentUnit } = this.state;

    return team
      ? team
          .getUnits()
          .map((unit, index) => (
            <UnitCard
              key={index}
              label={unit.getShortName()}
              color={team.getColor()}
              highlighted={unit === currentUnit}
            />
          ))
      : undefined;
  }

  private _renderField() {
    const { battleField, currentUnit, curAction, battle } = this.state;
    let onPress: ((x: number, y: number) => void) | undefined;
    const move = (x: number, y: number) => {
      battleField.moveUnit(currentUnit, x, y);
      battleField.unhighlighteAll();
      this.setState({ curAction: null });
      this._nextTurn();
    };
    const action = (x: number, y: number) => {
      switch (currentUnit.getType()) {
        case UNIT_TYPES.MAGE:
          currentUnit.action(
            new Target(battle.getAnotherTeamByUnit(currentUnit).getUnits()),
          );
          break;
        default:
          currentUnit.action(
            new Target(battleField.getField()[x][y].getItem()),
          );
          break;
      }
      battleField.unhighlighteAll();
      this.setState({ curAction: null });
      this._nextTurn();
    };

    switch (curAction) {
      case 'move':
        onPress = move;
        break;
      case 'action':
        onPress = action;
        break;
      default:
        break;
    }

    return battleField
      ? battleField.getField().map((row, rIndex) => (
          <View style={styles.battleFieldRow}>
            {row.map((cell, cIndex) => {
              const item = cell.getItem();

              return (
                <FieldCell
                  key={`${rIndex}:${cIndex}`}
                  x={rIndex}
                  y={cIndex}
                  onPress={cell.isHighlighted() ? onPress : undefined}
                  highlighted={cell.isHighlighted() || item === currentUnit}
                  label={item && item.getShortName()}
                  defending={item && item.isDefending()}
                  paralyzed={item && item.isParalyzed()}
                  teamColor={
                    (item && battle.getTeamByUnit(item).getColor()) || undefined
                  }
                  hp={item && item.getHealth()}
                  maxHp={item && item.getMaxHealth()}
                />
              );
            })}
          </View>
        ))
      : undefined;
  }

  private _updateState() {
    const battle = this.state.battle;
    this.setState({
      battle,
      battleField: battle.getBattleField(),
      currentTeam: battle.getCurrentTeam(),
      currentUnit: battle.getGlobalTeam().getCurrent(),
      globalTeam: battle.getGlobalTeam(),
    });
  }

  private _nextTurn() {
    this.state.battle.turn();
    this._updateState();
  }

  private _moveAction() {
    this.state.battleField.highlightPossibleCellsToMove(
      this.state.currentUnit!,
    );
    this.setState({ curAction: 'move' });
    this._updateState();
  }

  private _defendAction() {
    this.state.currentUnit.setDefending(true);
    this._nextTurn();
  }

  private _attackAction() {
    this.state.battle.highlightPossibleCellsToAction(this.state.currentUnit);
    this.setState({ curAction: 'action' });
    this._updateState();
  }

  public render() {
    const { globalTeam, currentUnit } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.battleField}>{this._renderField()}</View>
        {currentUnit && (
          <View style={styles.bar}>
            <View style={styles.specsBar}>
              <Text style={styles.specsRow}>SPECS:</Text>
              <Text style={styles.specsRow}>Type: {currentUnit.getType()}</Text>
              <Text style={styles.specsRow}>
                Health: {currentUnit.getHealth()}/{currentUnit.getMaxHealth()}
              </Text>
              <Text style={styles.specsRow}>
                Damage: {currentUnit.getDamage()}
              </Text>
            </View>
            <View style={styles.actionsBar}>
              <View>
                <Button title="move" onPress={() => this._moveAction()} />
                <Button title="defend" onPress={() => this._defendAction()} />
                <Button title="attack" onPress={() => this._attackAction()} />
              </View>
            </View>
          </View>
        )}

        <Button title="skip" onPress={() => this._nextTurn()} />
        <View style={styles.unitsBar}>{this._renderTeam(globalTeam)}</View>
      </View>
    );
  }
}

export default App;
