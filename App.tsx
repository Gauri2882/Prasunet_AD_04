import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [winner, setWinner] = useState<Player>(null);
    
    const handlePress = (index: number): void => {
        if (board[index] || winner) {
            return;
        }
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        checkWinner(newBoard);
    };

    const checkWinner = (board: Player[]): void => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }
    };

    const renderSquare = (index: number): JSX.Element => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.square}
                onPress={() => handlePress(index)}
            >
                <Text style={styles.squareText}>{board[index]}</Text>
            </TouchableOpacity>
        );
    };

    const handleReset = (): void => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tic Tac Toe</Text>
            <View style={styles.board}>
                {board.map((_, index) => renderSquare(index))}
            </View>
            {winner && (
                <Text style={styles.winnerText}>
                    Winner: {winner}
                </Text>
            )}
            <View style = {styles.buttonContainer}>
              <Button title="Reset" onPress={handleReset} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
    board: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    square: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        fontSize: 30,
    },
    winnerText: {
        fontSize: 24,
        marginVertical: 20,
    },
    buttonContainer:{
      marginTop:10
    }
});

const App: React.FC = () => {
    return (
        <TicTacToe />
    );
};

export default App;
