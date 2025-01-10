#!/bin/bash
if [ "$1" == "success" ]; then
  echo "RESULTADO DE LOS ÚLTIMOS TESTS: ![Success](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)" >> README.md
else
  echo "RESULTADO DE LOS ÚLTIMOS TESTS: ![Failure](https://img.shields.io/badge/test-failure-red)" >> README.md
fi
