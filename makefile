git: 
	@git pull
	@git add .
	@git commit -m "$m" #m="your message"
	@git push 

status:
	@git status

code:
	@code .

build:
	docker compose up --build -d

start: 
	docker compose start
	
stop:
	docker compose stop
	
clean:
	docker compose down --rmi all -v

tests:
	open coverage/lcov-report/index.html