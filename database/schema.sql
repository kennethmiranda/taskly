CREATE TABLE `users` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    `emailNotifications` tinyint(1) DEFAULT '0',
    `avatar` varchar(255) DEFAULT NULL,
    `streak` int DEFAULT '0',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE `user_providers` (
    `id` int NOT NULL AUTO_INCREMENT,
    `userId` bigint NOT NULL,
    `provider` varchar(255) NOT NULL,
    `providerId` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `userId` (`userId`),
    CONSTRAINT `user_providers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE `tasks` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `userId` bigint NOT NULL,
    `title` varchar(255) DEFAULT NULL,
    `description` text,
    `createdAt` datetime DEFAULT NULL,
    `dueDate` datetime DEFAULT NULL,
    `updatedAt` datetime DEFAULT NULL,
    `status` varchar(50) DEFAULT NULL,
    `priority` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `userId` (`userId`),
    CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1730237556161 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE `files` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `path` varchar(255) NOT NULL,
    `size` bigint NOT NULL,
    `type` varchar(100) NOT NULL,
    `taskId` bigint DEFAULT NULL,
    `uploadedAt` datetime NOT NULL,
    `userId` bigint NOT NULL,
    `uniqueName` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `taskId` (`taskId`),
    KEY `userId` (`userId`),
    CONSTRAINT `files_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `files_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 306 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci


